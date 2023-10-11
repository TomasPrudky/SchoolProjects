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
        public Controller MainSystem { get; set; }
        public List<Record> DataBlocks { get; set; }
        public List<char[]> CzechWords { get; set; }
        public MainWindow()
        {
            InitializeComponent();
            MainSystem = new Controller();
            DataBlocks = new List<Record>();
            CzechWords = new List<char[]>();
            LoadCzechWords();
        }

        private void Create_Blocks_Button_Click(object sender, RoutedEventArgs e)
        {
            DataBlocks = MainSystem.CreateBlocks();
            foreach (Record item in DataBlocks)
            {
                listOfBlocks.Items.Add(item);
            }
        }

        private void Save_Button_Click(object sender, RoutedEventArgs e)
        {
            MainSystem.SaveToFile(DataBlocks);
        }

        private void Load_Button_Click(object sender, RoutedEventArgs e)
        {
            listOfBlocks.Items.Clear();
            foreach (Record item in MainSystem.LoadData()) {
                listOfBlocks.Items.Add(item);
            }
        }

        private void Binary_Search_Button_Click(object sender, RoutedEventArgs e)
        {
            listOfBinarySearch.Items.Clear();
            binaryStats.Items.Clear();
            int totalCountOfTransfers = 0;

            for (int i = 0; i < 1000; i++)
            {
                Stat stat = MainSystem.BinarySearch(GetRandomWord());
                listOfBinarySearch.Items.Add($"Block key: {stat.Block.Key} | CoT: {stat.CountOfTransfers}");
                totalCountOfTransfers += stat.CountOfTransfers;
            }
            binaryStats.Items.Add($"Search: {1000}\nCoT: {totalCountOfTransfers}\nAVG CoT: {totalCountOfTransfers / 1000}");
        }

        private void Interpolation_Search_Button_Click(object sender, RoutedEventArgs e)
        {
            listOfInterpolationSearch.Items.Clear();
            interpolationStats.Items.Clear();
            int totalCountOfTransfers = 0;

            for (int i = 0; i < 1000; i++)
            {
                Stat stat = MainSystem.InterpolationSearch(GetRandomWord());
                listOfInterpolationSearch.Items.Add($"Block key: {stat.Block.Key} | CoT: {stat.CountOfTransfers}");
                totalCountOfTransfers += stat.CountOfTransfers;
            }

            interpolationStats.Items.Add($"Search: {1000}\nCoT: {totalCountOfTransfers}\nAVG CoT: {totalCountOfTransfers / 1000}");
        }

        private void LoadCzechWords() {
            foreach (string line in System.IO.File.ReadLines(@"data/czech.txt"))
            {
                char[] tmp = new char[Record.DEFAULT_LENGTH];
                for (int i = 0; i < Record.DEFAULT_LENGTH; i++)
                {
                    tmp[i] = '-';
                }

                for (int i = 0; i < line.Length; i++)
                {
                    if (i >= Record.DEFAULT_LENGTH) break;
                    tmp[i] = line[i];
                }
                CzechWords.Add(tmp);
            }
        }

        private char[] GetRandomWord() {
            Random random = new Random();
            int n = random.Next(CzechWords.Count);
            return CzechWords[n];
        }
    }
}
