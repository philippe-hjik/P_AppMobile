using System;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Text;
using VersOne.Epub;
using HtmlAgilityPack;

namespace MauiAPI
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
            FetchResponse(); // Appel de la méthode pour effectuer la requête HTTP lors de la construction de la page
        }

        private async void FetchResponse()
        {
            // Effectuer une requête HTTP GET
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync("http://10.0.2.2/api/books/1");

                    if (response.IsSuccessStatusCode)
                    {
                        // Récupérer le contenu de la réponse sous forme de tableau de bytes
                        byte[] blob = await response.Content.ReadAsByteArrayAsync();

                        // Convertir le tableau de bytes en une chaîne base64
                        string base64Data = Convert.ToBase64String(blob);

                        // Convertir la chaîne base64 en tableau de bytes
                        byte[] epubData = Convert.FromBase64String(base64Data);

                        // Load the book into memory
                        EpubBook book = EpubReader.ReadBook("accessible_epub_3.epub");

                        // Print the title and the author of the book
                        Console.WriteLine($"Title: {book.Title}");
                        Console.WriteLine($"Author: {book.Author}");
                        Console.WriteLine();

                        // Print the table of contents
                        Console.WriteLine("TABLE OF CONTENTS:");
                        PrintTableOfContents();
                        Console.WriteLine();

                        // Print the text content of all chapters in the book
                        Console.WriteLine("CHAPTERS:");
                        PrintChapters();

                        void PrintTableOfContents()
                        {
                            foreach (EpubNavigationItem navigationItem in book.Navigation)
                            {
                                PrintNavigationItem(navigationItem, 0);
                            }
                        }

                        void PrintNavigationItem(EpubNavigationItem navigationItem, int identLevel)
                        {
                            Console.Write(new string(' ', identLevel * 2));
                            Console.WriteLine(navigationItem.Title);
                            foreach (EpubNavigationItem nestedNavigationItem in navigationItem.NestedItems)
                            {
                                PrintNavigationItem(nestedNavigationItem, identLevel + 1);
                            }
                        }

                        void PrintChapters()
                        {
                            foreach (EpubLocalTextContentFile textContentFile in book.ReadingOrder)
                            {
                                PrintTextContentFile(textContentFile);
                            }
                        }

                        void PrintTextContentFile(EpubLocalTextContentFile textContentFile)
                        {
                            HtmlDocument htmlDocument = new();
                            htmlDocument.LoadHtml(textContentFile.Content);
                            StringBuilder sb = new();
                            foreach (HtmlNode node in htmlDocument.DocumentNode.SelectNodes("//text()"))
                            {
                                sb.AppendLine(node.InnerText.Trim());
                            }
                            string contentText = sb.ToString();
                            Console.WriteLine(contentText);
                            Console.WriteLine();
                        }
                    }
                    else
                    {
                        // Afficher le message d'erreur dans ResponseLabel si la requête échoue
                        ErrorLabel.Text = $"Erreur : {response.StatusCode}";
                    }
                }
                catch (Exception ex)
                {
                    // Afficher le message d'erreur dans ResponseLabel s'il y a une exception
                    ErrorLabel.Text = $"Une erreur s'est produite : {ex.Message}";
                }
            }
        }

        private void OnCounterClicked(object sender, EventArgs e)
        {
            count++;

            if (count == 1)
                CounterBtn.Text = $"Clicked {count} time";
            else
                CounterBtn.Text = $"Clicked {count} times";

            SemanticScreenReader.Announce(CounterBtn.Text);
        }
    }
}
