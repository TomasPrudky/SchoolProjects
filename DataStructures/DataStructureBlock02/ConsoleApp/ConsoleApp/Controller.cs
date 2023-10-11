using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;

namespace ConsoleApp
{
    public class Controller
    {
        private const string DEFAULT_FILE = "data.bin";
        public List<char[]> CzechWords { get; set; }
        private static char[] alphabet = "aábcčdďeéěfghiíjklmnňoópqrřsštťuúůvwxyýzž".ToCharArray();

        public Controller()
        {
            CzechWords = new List<char[]>();
            LoadCzechWords();
        }

        public List<Record> CreateBlockFile() {
            int sizeOfControllBlock = 1024;
            int sizeOfDataBlock = 25000;
            List<Record> records = ReadDataAndCreateRecords();
            List<DataBlock> dataBlocks = CreateDataBlocks(records);
            ControllBlock cb = new ControllBlock(sizeOfControllBlock, sizeOfDataBlock, dataBlocks.Count, dataBlocks[0].Records.Count);

            BinaryFormatter bf = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                memoryStream.Position = 0;
                bf.Serialize(memoryStream, cb);
                for (int i = 0; i < dataBlocks.Count; i++)
                {
                    memoryStream.Position = sizeOfControllBlock + sizeOfDataBlock * i;
                    bf.Serialize(memoryStream, dataBlocks[i]);
                }

                using (BinaryWriter writer = new BinaryWriter(new FileStream(DEFAULT_FILE, FileMode.Create, FileAccess.Write)))
                {
                    writer.Write(memoryStream.ToArray());
                    writer.Flush();
                    writer.Close();
                }
            }

            return records;
        }

        private List<DataBlock> CreateDataBlocks(List<Record> records)
        {
            List<DataBlock> dataBlocks = new List<DataBlock>();

            for (int i = 0; i < 100; i++)
            {
                DataBlock block = new DataBlock();
                for (int j = 0; j < 100; j++)
                {
                    if (j == 0) block.FirstRecord = records[i * 100 + j];
                    if (j == 99) block.LastRecord = records[i * 100 + j];
                    block.Records.Add(records[i * 100 + j]);
                }
                dataBlocks.Add(block);
            }

            return dataBlocks;
        }

        private List<Record> ReadDataAndCreateRecords()
        {
            List<Record> records = new List<Record>();
            List<string> list = new List<string>();
            List<string> paths = Directory.EnumerateFiles(@"data/", "*.txt").ToList();
            foreach (string filePath in paths)
            {
                string[] lines = File.ReadAllLines(filePath);
                list.AddRange(lines.ToList());
            }

            for (int i = 0; i < list.Count / 3; i++)
            {
                records.Add(new Record(list[i], list[i + 20000], list[i + 10000]));

            }

            records.Sort();
            return records;
        }

        private ControllBlock GetControllBlock()
        {
            using (BinaryReader reader = new BinaryReader(new FileStream(DEFAULT_FILE, FileMode.Open)))
            {
                reader.BaseStream.Seek(0, SeekOrigin.Begin);
                byte[] data = reader.ReadBytes(1024);

                BinaryFormatter binForm = new BinaryFormatter();
                using (MemoryStream ms = new MemoryStream(data))
                {
                    ControllBlock record = (ControllBlock)binForm.Deserialize(ms);
                    return record;
                }
            }
        }

        public DataBlock GetBlock(int position)
        {
            ControllBlock controllBlock = GetControllBlock();

            using (BinaryReader reader = new BinaryReader(new FileStream(DEFAULT_FILE, FileMode.Open)))
            {
                reader.BaseStream.Seek(controllBlock.SizeOfControllBlock + position * controllBlock.SizeOfDatablock, SeekOrigin.Begin);
                byte[] data = reader.ReadBytes(controllBlock.SizeOfDatablock);

                BinaryFormatter binForm = new BinaryFormatter();
                using (MemoryStream ms = new MemoryStream(data))
                {
                    DataBlock record = (DataBlock)binForm.Deserialize(ms);
                    return record;
                }
            }
        }

        public Stat BinarySearch(char[] key) {
            int left = 0;
            int right = GetControllBlock().CountOfDatablocks - 1;
            int transfers = 0;

            DataBlock leftBlock = GetBlock(left);
            DataBlock rightBlock = GetBlock(right);

            while (left <= right) {
                int center = (left + right) / 2;
                DataBlock centerBlock = GetBlock(center);
                transfers++;

                if (centerBlock.FirstRecord.CompareTo(key) <= 0 && centerBlock.LastRecord.CompareTo(key) >= 0) {
                    return new Stat(transfers, centerBlock);
                }
                if (centerBlock.FirstRecord.CompareTo(key) == 1)
                {
                    right = center - 1;
                }
                else {
                    left = center + 1;
                }
            }

            return null;
        }

        public Stat InterpolationSearch(char[] key) {
            int left = 0;
            int right = GetControllBlock().CountOfDatablocks - 1;
            int center;
            int transfers = 0;

            DataBlock leftBlock = GetBlock(left);
            DataBlock rightBlock = GetBlock(right);
            DataBlock centerBlock = null;

            int div = Evaluate(rightBlock.LastRecord.CzechWord) - Evaluate(leftBlock.FirstRecord.CzechWord);
            if (div == 0)
            {
                div = 1;
            }

            while ((rightBlock.LastRecord != leftBlock.FirstRecord)
                && (leftBlock.FirstRecord.CompareTo(key) == -1) &&
                (rightBlock.LastRecord.CompareTo(key) == 1)) {

                center = left + ((Evaluate(key) - Evaluate(leftBlock.FirstRecord.CzechWord)) * ((right - left) / div));
                centerBlock = GetBlock(center);
                transfers += 1;

                if (centerBlock.FirstRecord.CompareTo(key) <= 0 && centerBlock.LastRecord.CompareTo(key) >= 0) {
                    return new Stat(transfers, centerBlock);
                }

                if (centerBlock.FirstRecord.CompareTo(key) == -1 && centerBlock.LastRecord.CompareTo(key) == -1)
                {
                    left = center + 1;
                    center = left;
                }
                else if(centerBlock.FirstRecord.CompareTo(key) == 1 && centerBlock.LastRecord.CompareTo(key) == 1)
                {
                    right = center - 1;
                    right = center;
                }
                else {
                    return new Stat(transfers, centerBlock);
                }

                leftBlock = GetBlock(left);
                rightBlock = GetBlock(right);
            }

            return new Stat(transfers, centerBlock);
        }

        private int Evaluate(char[] word)
        {
            for (int i = 0; i < alphabet.Length; i++)
            {
                if (alphabet[i] == word[0]) return i;
            }
            return 0;
        }

        private void LoadCzechWords()
        {
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

        public char[] GetRandomWord() {
            Random random = new Random();
            int n = random.Next(CzechWords.Count);
            string s = new string(CzechWords[n]).ToLower();
            return s.ToCharArray();
        }
    }
}
