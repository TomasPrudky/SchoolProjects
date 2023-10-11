using ConsoleApp1;
using System.Collections.Generic;
using System.Windows;

namespace WpfApp.Windows
{
    /// <summary>
    /// Interakční logika pro ShortestPathWindow.xaml
    /// </summary>
    public partial class ShortestPathWindow : Window
    {
        private Graph<string, Edge<string, Rail>> graph;
        private TrainController trainController;

        public ShortestPathWindow(Graph<string, Edge<string, Rail>> graph, TrainController trainController)
        {
            InitializeComponent();
            this.graph = graph;
            this.trainController = trainController;
            InitializeComboboxes();
        }

        private void InitializeComboboxes()
        {
            foreach (Train train in trainController.LiostOfTrains)
            {
                trainsComboBox.Items.Add(train);
            }

            foreach (var edge in graph.GetAllEdges())
            {
                toComboBox.Items.Add(edge);
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (trainsComboBox.SelectedIndex != -1 && toComboBox.SelectedIndex != -1)
            {
                Train train = trainController.LiostOfTrains[trainsComboBox.SelectedIndex];
                Edge<string, Rail> to = graph.GetAllEdges()[toComboBox.SelectedIndex];

                if (train.Length > graph.GetData(to.To)[0].Data.Length);
                {
                    MessageBox.Show("Cílová kolej je příliš krátká");
                    Close();
                    return;
                }

                if (!to.Data.Standing)
                {
                    MessageBox.Show("Na cílové koleji nemůže vlak stát");
                    Close();
                    return;
                }

                string oposite = ((MainWindow)Application.Current.MainWindow).NodeController.GetSecondPair(to.From);
                PairNodes p = ((MainWindow)Application.Current.MainWindow).NodeController.GetPair(to.To);

                if (to.Data.IsBusy || (p.BusyLength + train.Length > graph.GetData(to.To)[0].Data.Length))
                {
                    MessageBox.Show("Cílová kolej je momentálně obsazená");
                    Close();
                    return;

                }             

                ((MainWindow)Application.Current.MainWindow).ChangeBusyRailByTrain(train);
                ((MainWindow)Application.Current.MainWindow).NodeController.GetPair(train.ActualRail.To).BusyLength -= train.Length;

                Dijkstra dijkstra = new Dijkstra(train.ActualRail, to, graph, train, trainController);
                List<Element> path = dijkstra.BuildPath();

                ((MainWindow)Application.Current.MainWindow).ChangeBusyRailByTrain(train);
                ((MainWindow)Application.Current.MainWindow).NodeController.GetPair(train.ActualRail.To).BusyLength += train.Length;
                ((MainWindow)Application.Current.MainWindow).RefreshListViewOfNodesAndEges();

                if (path != null)
                {
                    foreach (Element item in path)
                    {
                        ((MainWindow)Application.Current.MainWindow).listOfShortestPath.Items.Add(item);
                    }
                }
            }

            Close();
        }
    }
}
