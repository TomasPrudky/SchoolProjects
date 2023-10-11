using ConsoleApp1;
using Microsoft.Win32;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using WpfApp.Windows;

namespace WpfApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Graph<string, Edge<string, Rail>> Graph = new();
        private TrainController trainController = new();
        public NodeController NodeController { get; set; } = new();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void AddNodeButtonClick(object sender, RoutedEventArgs e)
        {
            AddNodeWindow addNode = new AddNodeWindow(Graph, listOfNodes, NodeController);

            if (addNode.ShowDialog() != null)
            {
                RefreshListViewOfNodesAndEges();
            }
        }

        private void RemoveNodeButtonClick(object sender, RoutedEventArgs e)
        {
            if (listOfNodes.SelectedItem != null)
            {
                string key = Graph.GetNodes()[listOfNodes.SelectedIndex];
                var edge = Graph.GetData(key);

                foreach (Edge<string, Rail> item in Graph.GetAllEdges())
                {
                    if (edge[0].From == item.To)
                    {
                        Graph.RemoveEdge(item.From.ToString(), item);
                    }
                }

                Graph.RemoveNode(edge[0].From);

                RefreshListViewOfNodesAndEges();
            }
        }

        private void AddEdgeButtonClick(object sender, RoutedEventArgs e)
        {
            AddEdgeWindow addEdgeWindow = new AddEdgeWindow(Graph);
            addEdgeWindow.Show();
        }

        private void RemoveEdgeButtonClick(object sender, RoutedEventArgs e)
        {
            if (listOfEdges.SelectedItem != null)
            {
                Graph.RemoveEdge(Graph.GetAllEdges()[listOfEdges.SelectedIndex].From, Graph.GetAllEdges()[listOfEdges.SelectedIndex]);

                RefreshListViewOfNodesAndEges();
            }
        }
        private void AddTrainButtonClick(object sender, RoutedEventArgs e)
        {
            AddTrain addTrain = new(Graph, trainController);
            addTrain.Show();
        }

        private void RemoveTrainButtonClick(object sender, RoutedEventArgs e)
        {
            if (listOfTrains.SelectedItem != null)
            {
                ChangeBusyRailByTrain(trainController.LiostOfTrains[listOfTrains.SelectedIndex]);
                trainController.LiostOfTrains.RemoveAt(listOfTrains.SelectedIndex);
                listOfTrains.Items.RemoveAt(listOfTrains.SelectedIndex);
                RefreshListViewOfNodesAndEges();
            }
        }

        private void FindPathButtonClick(object sender, RoutedEventArgs e)
        {
            ShortestPathWindow shortestPathWindow = new ShortestPathWindow(Graph, trainController);
            shortestPathWindow.ShowDialog();

        }

        private void LoadDataButtonClick(object sender, RoutedEventArgs e)
        {
            try
            {
                OpenFileDialog openFileDialog = new OpenFileDialog();
                openFileDialog.Title = "Load data";
                openFileDialog.DefaultExt = "txt";
                openFileDialog.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*";

                if (openFileDialog.ShowDialog() == true)
                {

                    string filePath = openFileDialog.FileName;
                    List<string> data = DataReader.ReadFile(filePath);

                    foreach (var item in data)
                    {
                        string[] tokens = item.Split(';');
                        Rail tmpNode = new(int.Parse(tokens[3]), bool.Parse(tokens[4]), bool.Parse(tokens[5]));
                        Edge<string, Rail> tmpEdge = new(tokens[1], tokens[2], tmpNode);
                        Graph.AddEdge(tokens[0], tmpEdge);

                        string namePair = tokens[0].Substring(1);

                        PairNodes pairNodes = new PairNodes("1" + namePair, "2" + namePair);
                        if (!NodeController.CheckIfExistInList(pairNodes))
                        {
                            NodeController.ListOfPairs.Add(pairNodes);
                        }

                    }

                    RefreshListViewOfNodesAndEges();
                }
            }
            catch
            {
                MessageBox.Show("Error: File content or file not supported");
            }

        }

        private void RemoveDataButtonClick(object sender, RoutedEventArgs e)
        {
            ClearLists();
            Graph = new();
            trainController = new();
        }

        public void RefreshListViewOfNodesAndEges()
        {
            ClearLists();

            foreach (var node in Graph.Edges)
            {
                listOfNodes.Items.Add(node.Key.ToString());

                foreach (Edge<string, Rail> edge in node.Value)
                {
                    listOfEdges.Items.Add(edge.ToString());
                }
            }

            foreach (Train item in trainController.LiostOfTrains)
            {
                listOfTrains.Items.Add(item);
            }
        }

        private void ClearLists()
        {
            listOfNodes.Items.Clear();
            listOfEdges.Items.Clear();
            listOfTrains.Items.Clear();
            listOfShortestPath.Items.Clear();
        }

        private void EditEdgeButtonClick(object sender, RoutedEventArgs e)
        {
            Edge<string, Rail> edge = Graph.GetAllEdges()[listOfEdges.SelectedIndex];
            AddEdgeWindow addEdgeWindow = new AddEdgeWindow(Graph, edge);
            addEdgeWindow.Show();
        }

        public void SetBusyRails(TrainController trainController)
        {
            foreach (Train train in trainController.LiostOfTrains)
            {
                foreach (Edge<string, Rail> element in Graph.GetAllEdges())
                {
                    if (element.From == train.ActualRail.From)
                    {
                        element.Data.IsBusy = true;
                    }

                    if (NodeController.GetSecondPair(train.ActualRail.From) == element.From)
                    {
                        //element.Data.IsBusy = true;
                    }
                }
            }
        }

        public void ChangeBusyRailByTrain(Train train)
        {
            bool actualBusyState = !train.ActualRail.Data.IsBusy;

            foreach (Edge<string, Rail> item in Graph.GetAllEdges())
            {
                if (item.From == train.ActualRail.From)
                {
                    item.Data.IsBusy = actualBusyState;
                }

                if (NodeController.GetSecondPair(train.ActualRail.From) == item.From)
                {
                    //item.Data.IsBusy = actualBusyState;
                }
            }      
        }
    }
}