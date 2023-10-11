using ConsoleApp1;
using System;
using System.Windows;

namespace WpfApp.Windows
{
    /// <summary>
    /// Interakční logika pro AddEdgeWindow.xaml
    /// </summary>
    public partial class AddEdgeWindow : Window
    {
        private Graph<string, Edge<string, Rail>> graph;
        private Edge<string, Rail> edge;
        private bool edit = false;

        public AddEdgeWindow(Graph<string, Edge<string, Rail>> graph)
        {
            InitializeComponent();
            this.graph = graph;
            InitializeValues();

        }

        public AddEdgeWindow(Graph<string, Edge<string, Rail>> graph, Edge<string, Rail> edge) : this(graph)
        {
            this.edge = edge;
            edit = true;
            SetEdge();
        }

        private void SetEdge()
        {
            fromComboBox.SelectedItem = edge.From;
            toComboBox.SelectedItem = edge.To;
            lengthTextBox.Text = edge.Data.Length.ToString();

            if (edge.Data.Reversing)
            {
                reversingComboBox.SelectedItem = "true";
            }
            else
            {
                reversingComboBox.SelectedItem = "false";
            }

            if (edge.Data.Standing)
            {
                standingComboBox.SelectedItem = "true";
            }
            else
            {
                standingComboBox.SelectedItem = "false";
            }
        }

        private void InitializeValues()
        {
            reversingComboBox.Items.Add("true");
            reversingComboBox.Items.Add("false");

            standingComboBox.Items.Add("true");
            standingComboBox.Items.Add("false");

            foreach (var item in graph.Edges)
            {
                fromComboBox.Items.Add(item.Key.ToString());
                toComboBox.Items.Add(item.Key.ToString());
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (edit)
                {
                    graph.RemoveEdge(edge.From.ToString(), edge);
                }

                if (fromComboBox.SelectedItem != null && toComboBox.SelectedItem != null)
                {
                    Edge<string, Rail> edge = new(fromComboBox.SelectedItem.ToString(), toComboBox.SelectedItem.ToString(),
                        new Rail(int.Parse(lengthTextBox.Text), bool.Parse(standingComboBox.Text), bool.Parse(reversingComboBox.Text)));
                    graph.AddEdge(fromComboBox.SelectedItem.ToString(), edge);
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
            ((MainWindow)Application.Current.MainWindow).RefreshListViewOfNodesAndEges();
            Close();
        }
    }
}
