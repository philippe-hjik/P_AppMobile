using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using HtmlAgilityPack;
using Microsoft.Maui.Controls;
using Newtonsoft.Json;
using VersOne.Epub;

namespace MauiAPI
{
    public partial class MainPage : ContentPage
    {
        private int nbBooks = 1;

        bool fetchData = false;

        public MainPage()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            FetchNumberOfBooks();
            FetchResponseAsync(); // Appel de la méthode pour effectuer la requête HTTP lors de l'affichage de la page
        }

        private async void FetchResponseAsync()
        {
            if (fetchData != true)
            {
                fetchData = true;
                // Effectuer une requête HTTP GET
                using (HttpClient client = new HttpClient())
                {
                    try
                    {
                        for (byte i = 1; i <= nbBooks; i++)
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
                                BookContentEditor.Text = epubBook.Title + "\n";

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

                                titleButton.Text = epubBook.Title;

                                // Ajouter un gestionnaire d'événements pour afficher l'auteur lors du clic sur le titre
                                titleButton.Clicked += async (sender, args) =>
                                {
                                    // Ouvrir une nouvelle page lors du clic sur le bouton
                                    await Navigation.PushAsync(new NewPage(epubBook));


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
                                    titleButton.Text += navigationItem.Title + "\n";
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

        private async void FetchNumberOfBooks()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync($"http://10.0.2.2/api/books/");

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();

                        nbBooks = Convert.ToInt32(content);

                        Debug.WriteLine("-----------------------------as-----------------------");
                        Trace.WriteLine(content);
                        Debug.WriteLine("--------------------as--------------------------------");
                    }
                    else
                    {
                        Trace.WriteLine($"Failed to retrieve data for the number of books. Status code: {response.StatusCode}");
                    }
                }
                catch (Exception ex)
                {
                    // Gérer les exceptions
                    Trace.WriteLine($"Une erreur s'est produite : {ex.Message}");
                }
            }
        }

    }

    // Définition de la classe NewPage
    public class NewPage : ContentPage
    {
        public NewPage(EpubBook epubBook)
        {
            // Créer une disposition pour afficher les détails du livre
            var layout = new StackLayout();

            // Créer un ScrollView pour afficher le contenu du livre
            var scrollView = new ScrollView();

            // Créer un StackLayout pour contenir le contenu HTML des fichiers de contenu
            var contentLayout = new StackLayout();

            // Parcourir les fichiers de contenu du livre
            foreach (var contentFile in epubBook.ReadingOrder)
            {
                // Charger le contenu HTML du fichier
                var htmlContent = contentFile.Content;

                // Créer un HtmlDocument à partir du contenu HTML
                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(htmlContent);

                // Extraire le texte du document HTML et l'ajouter à la disposition
                var text = htmlDocument.DocumentNode.InnerText;
                contentLayout.Children.Add(new Label { Text = text });
            }

            // Ajouter le StackLayout contenant le contenu à la ScrollView
            scrollView.Content = contentLayout;

            // Ajouter la ScrollView à la disposition principale
            layout.Children.Add(scrollView);

            // Afficher la disposition dans la page
            Content = layout;

            // Afficher le titre du livre
            layout.Children.Add(new Label { Text = $"Titre du livre : {epubBook.Title}" });

            // Afficher les auteurs du livre
            var authors = string.Join(", ", epubBook.Author);
            layout.Children.Add(new Label { Text = $"Auteurs : {authors}" });

            // Afficher la description du livre
            layout.Children.Add(new Label { Text = $"Description : {epubBook.Description}" });

            // Afficher la couverture du livre
            if (epubBook.CoverImage != null)
            {
                var imageStream = new MemoryStream(epubBook.CoverImage);
                var coverImage = new Image
                {
                    Source = ImageSource.FromStream(() => imageStream),
                    WidthRequest = 100,
                    HeightRequest = 150,
                    Aspect = Aspect.AspectFit
                };
                layout.Children.Add(coverImage);
            }

            // Afficher la table des matières du livre
            layout.Children.Add(new Label { Text = "Table des matières :" });
            foreach (var navigationItem in epubBook.Navigation)
            {
                DisplayNavigationItem(layout, navigationItem, 0);
            }

            // Afficher la disposition dans la page
            Content = new ScrollView { Content = layout };
        }

        // Fonction récursive pour afficher les éléments de la table des matières
        private void DisplayNavigationItem(StackLayout layout, EpubNavigationItem navigationItem, int level)
        {
            layout.Children.Add(new Label { Text = new string(' ', level * 4) + navigationItem.Title });

            foreach (var nestedNavigationItem in navigationItem.NestedItems)
            {
                DisplayNavigationItem(layout, nestedNavigationItem, level + 1);
            }
        }


    }
}
