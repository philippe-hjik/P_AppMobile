using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.Maui.Controls;
using VersOne.Epub;

namespace MauiAPI
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            FetchResponseAsync(); // Appel de la méthode pour effectuer la requête HTTP lors de l'affichage de la page
        }

        private async void FetchResponseAsync()
        {
            // Effectuer une requête HTTP GET
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync("http://10.0.2.2/api/books");

                    // Récupérer le contenu de la réponse sous forme de tableau de bytes
                    var content = response.Content;

                    // Charger le livre électronique à partir du fichier .epub
                    EpubBook epubBook = EpubReader.ReadBook(content.ReadAsStream());

                    // Afficher le contenu du livre dans un Editor
                    BookContentEditor.Text = "";

                    // Print the title and the author of the book
                    Debug.WriteLine($"Title: {epubBook.Title}");
                    Debug.WriteLine($"Author: {epubBook.Author}");

                    // Print the table of contents
                    Debug.WriteLine("TABLE OF CONTENTS:");
                    PrintTableOfContents();

                    // Print the text content of all chapters in the book
                    Debug.WriteLine("CHAPTERS:");
                    PrintChapters();

                    void PrintTableOfContents()
                    {
                        foreach (EpubNavigationItem navigationItem in epubBook.Navigation)
                        {
                            PrintNavigationItem(navigationItem, 0);
                        }
                    }

                    void PrintNavigationItem(EpubNavigationItem navigationItem, int identLevel)
                    {
                        Debug.Write(new string(' ', identLevel * 2));
                        Debug.WriteLine(navigationItem.Title);
                        foreach (EpubNavigationItem nestedNavigationItem in navigationItem.NestedItems)
                        {
                            PrintNavigationItem(nestedNavigationItem, identLevel + 1);
                        }
                    }

                    void PrintChapters()
                    {
                        foreach (EpubLocalTextContentFile textContentFile in epubBook.ReadingOrder)
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
                        BookContentEditor.Text += contentText + "\n"; // Ajoutez le texte au Editor
                    }

                }
                catch (Exception ex)
                {
                    // Gérer les exceptions
                    ErrorLabel.Text = $"Une erreur s'est produite : {ex}";
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
