using ConsoleApp1;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;

namespace WpfApp.Windows
{
    /// <summary>
    /// Interakční logika pro AddNodeWindow.xaml
    /// </summary>
    public partial class AddNodeWindow : Window
    {
        private ListView listOfNodes;
        private Graph<string, Edge<string, Rail>> graph;
        private NodeController nodeController;

        public AddNodeWindow(Graph<string, Edge<string, Rail>> graph, ListView listOfNodes, NodeController nodeController)
        {
            InitializeComponent();
            this.listOfNodes = listOfNodes;
            this.graph = graph;
            this.nodeController = nodeController;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Regex regex = new Regex("^[a-zA-Z]+");
            bool hasOnlyAlpha = regex.IsMatch(textBox.Text);
            if (hasOnlyAlpha)
            {
                if (graph.GetData("1" + textBox.Text) == null)
                {
                    PairNodes pairNodes = new PairNodes("1" + textBox.Text, "2" + textBox.Text);
                    if (!nodeController.CheckIfExistInList(pairNodes))
                    {
                        nodeController.ListOfPairs.Add(pairNodes);
                    }
                }
                graph.AddNode("1" + textBox.Text);
                graph.AddNode("2" + textBox.Text);
            }
            Close();
        }
    }
}
