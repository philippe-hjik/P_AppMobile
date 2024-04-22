using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
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
                    HttpResponseMessage response = await client.GetAsync("http://10.0.2.2/api");

                    if (response.IsSuccessStatusCode)
                    {
                        // Récupérer le contenu de la réponse sous forme de tableau de bytes
                        byte[] epubBytes = await response.Content.ReadAsByteArrayAsync();

                        // Enregistrer les données binaires dans un fichier .epub sur le disque
                        string epubFilePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "book.epub");
                        File.WriteAllBytes(epubFilePath, epubBytes);

                        ResponseLabel.Text = response.ToString();
                        Debug.Write(response);
                        Debug.Write("asdasd");

                        // Charger le livre électronique à partir du fichier .epub
                        EpubBook epubBook = EpubReader.ReadBook(epubFilePath);

                        // Afficher le contenu du fichier ePub
                        // Ici, vous pouvez utiliser les propriétés et les méthodes d'EpubBook pour afficher le contenu dans votre application

                        // Par exemple, pour afficher le titre et l'auteur
                        Console.WriteLine($"Title: {epubBook.Title}");
                        Console.WriteLine($"Author: {epubBook.Author}");

                        // Afficher le contenu du livre dans un Editor
                        BookContentEditor.Text = "";
                        foreach (EpubLocalTextContentFile textContentFile in epubBook.ReadingOrder)
                        {
                            BookContentEditor.Text += textContentFile.Content + Environment.NewLine + Environment.NewLine;
                        }
                    }
                    else
                    {
                        // Gérer les erreurs si la requête échoue
                        ErrorLabel.Text = $"Erreur : {response.StatusCode}";
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
