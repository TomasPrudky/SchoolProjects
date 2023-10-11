using ConsoleApp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Controller controller;

        public MainWindow()
        {
            InitializeComponent();
            controller = new Controller();
        }

        private void Interpolation_Search_Button_Click(object sender, RoutedEventArgs e)
        {
            Stat stat = controller.InterpolationSearch(controller.GetRandomWord());
            listOfInterpolationSearch.Items.Add($"Number of searchs: {1}\nTotal trasfers: {stat.CountOfTransfers}");
        }

        private void Binary_Search_Button_Click(object sender, RoutedEventArgs e)
        {
            int countOfTransfers = 0;
            for (int i = 0; i < 1000; i++)
            {
                char[] key = controller.GetRandomWord();
                Stat s = controller.BinarySearch(key);
                foreach (var item in s.Data.Records) {
                    if (item.CompareTo(key) == 0)
                    {
                        listOfBinarySearch.Items.Add($"{i}. blok: {s.CountOfTransfers} transfers");
                        countOfTransfers += s.CountOfTransfers;
                        break;
                    }
                }
                
            }
            double avg = countOfTransfers / 1000;
            binaryStats.Items.Add($"Number of searchs: {1000}\nTotal trasfers: {countOfTransfers}\n" +
                                    $"Transfer per block: {avg}");
        }

        private void Create_Blocks_Button_Click(object sender, RoutedEventArgs e)
        {
            List<Record> records = controller.CreateBlockFile();
            foreach (var item in records) {
                listOfBlocks.Items.Add(item);
            }
        }
    }
}
