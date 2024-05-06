using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.Maui.Controls;
using Newtonsoft.Json;
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
                    for (int i = 1; i <= 7; i++)
                    {
                        HttpResponseMessage response = await client.GetAsync($"http://10.0.2.2/api/books/{i}");

                        if (response.IsSuccessStatusCode)
                        {
                            var content = response.Content;

                            // Charger le livre électronique à partir du fichier .epub
                            EpubBook epubBook = EpubReader.ReadBook(content.ReadAsStream());

                            Debug.WriteLine($"Title of Book {i}: {epubBook.Title}");
                            // Vous pouvez afficher le titre dans l'interface utilisateur ici
                            // Afficher le contenu du livre dans un Editor
                            BookContentEditor.Text += epubBook.Title + "\n";

                            // Créer une image pour le livre à partir des bytes
                            var imageStream = new MemoryStream(epubBook.CoverImage); // imageBytes est votre tableau de bytes
                            // Créer une image pour le livre
                            Image bookImage = new Image
                            {
                                Source = ImageSource.FromStream(() => imageStream),
                                WidthRequest = 100, // Ajustez la largeur de l'image selon vos besoins
                                Aspect = Aspect.AspectFit // Ajustez l'aspect de l'image selon vos besoins
                            };
                            BookButtonsLayout.Children.Add(bookImage);

                            // Créer un bouton pour le titre du livre
                            Button titleButton = new Button
                            {
                                Margin = new Thickness(10)
                            };

                            // Ajouter un gestionnaire d'événements pour afficher l'auteur lors du clic sur le titre
                            titleButton.Clicked += async (sender, args) =>
                            {
                                await DisplayAlert("Author", epubBook.Author, "OK");
                            };

                            // Print the table of contents
                            Debug.WriteLine("TABLE OF CONTENTS:");
                            PrintTableOfContents();

                            // Print the text content of all chapters in the book
                            Debug.WriteLine("CHAPTERS:");
                            PrintChapters();

                            // Ajouter le bouton au layout
                            BookButtonsLayout.Children.Add(titleButton);

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
                                titleButton.Text += navigationItem.Title+"\n";
                                //BookContentEditor.Text += "" + navigationItem.Title;
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

                            }
                        }
                        else
                        {
                            Debug.WriteLine($"Failed to retrieve data for Book {i}. Status code: {response.StatusCode}");
                        }
                    }

                    //HttpResponseMessage response = await client.GetAsync("http://10.0.2.2/api/books");

                    // Récupérer le contenu de la réponse sous forme de tableau de bytes
                    //var content = response.Content;

                    // Charger le livre électronique à partir du fichier .epub
                    //EpubBook epubBook = EpubReader.ReadBook(content.ReadAsStream
                }
                catch (Exception ex)
                {
                    // Gérer les exceptions
                    ErrorLabel.Text = $"Une erreur s'est produite : {ex}";
                }
            }
        }

    }
}
