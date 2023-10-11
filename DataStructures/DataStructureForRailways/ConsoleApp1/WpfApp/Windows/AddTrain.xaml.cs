using ConsoleApp1;
using System;
using System.Windows;

namespace WpfApp.Windows
{
    /// <summary>
    /// Interakční logika pro AddTrain.xaml
    /// </summary>
    public partial class AddTrain : Window
    {
        private Graph<string, Edge<string, Rail>> graph;
        private TrainController trainController;

        public AddTrain(Graph<string, Edge<string, Rail>> graph, TrainController trainController)
        {
            InitializeComponent();
            SetComboBox(graph);
            this.graph = graph;
            this.trainController = trainController;
        }

        private void SetComboBox(Graph<string, Edge<string, Rail>> graph)
        {
            foreach (Edge<string, Rail> item in graph.GetAllEdges())
            {
                comboBox.Items.Add(item);
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            int length;
            try
            {
                if (comboBox.Items != null && int.TryParse(lengthOfTrainTextBox.Text, out length))
                {
                    Edge<string, Rail> edge = graph.GetAllEdges()[comboBox.SelectedIndex];
                    PairNodes pair = ((MainWindow)Application.Current.MainWindow).NodeController.GetPair(graph.GetData(edge.To)[0].From);

                    MessageBox.Show((pair.BusyLength + length).ToString());


                    if (graph.GetData(edge.To)[0].Data.Standing || (pair.BusyLength + length > graph.GetData(edge.To)[0].Data.Length) || edge.Data.IsBusy)
                    {
                        MessageBox.Show("Na této koleji nemůže vlak stát");
                        Close();
                        return;
                    }

                    if (graph.GetData(edge.To)[0].Data.Length > length)
                    {
                        Train train = new Train(length, edge);
                        trainController.LiostOfTrains.Add(train);

                        ((MainWindow)Application.Current.MainWindow).ChangeBusyRailByTrain(train);
                        ((MainWindow)Application.Current.MainWindow).NodeController.GetPair(train.ActualRail.From).BusyLength += train.Length;
                        ((MainWindow)Application.Current.MainWindow).listOfTrains.Items.Add(train);
                        ((MainWindow)Application.Current.MainWindow).RefreshListViewOfNodesAndEges();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
            Close();
        }
    }
}
