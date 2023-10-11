using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Controller
    {
        private const int BLOCK_SIZE = 400;
        private const string DEFAULT_FILE = "data.bin";
        private readonly char[] VOCABULARY = setVocabulary();

        private static char[] setVocabulary()
        {
            string allChars = "AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYÝZŽaábcčdďeéěfghiíjklmnňoópqrřsštťuúůvwxyýzž";
            char[] array = new char[allChars.Length];
            for (int i = 0; i < allChars.Length; i++)
            {
                array[i] = allChars[i];
            }

            return array;
        }

        public List<Record> CreateBlocks() {
            List<string> list = new List<string>();
            List<Record> dataBlocks = new List<Record>();

            List<string> paths = Directory.EnumerateFiles(@"data/", "*.txt").ToList();
            foreach (string filePath in paths)
            {
                string[] lines = File.ReadAllLines(filePath);
                list.AddRange(lines.ToList());
            }

            for (int i = 0; i < list.Count / 3; i++)
            {
                dataBlocks.Add(new Record(list[i], list[i + 20000], list[i + 10000]));
            }

            dataBlocks.Sort();

            return dataBlocks;
        }

        public void SaveToFile(List<Record> dataBlocks)
        {

            BinaryFormatter bf = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {

                for (int i = 0; i < dataBlocks.Count; i++)
                {
                    memoryStream.Position = BLOCK_SIZE * i;
                    bf.Serialize(memoryStream, dataBlocks[i]);
                }

                using (BinaryWriter writer = new BinaryWriter(new FileStream(DEFAULT_FILE, FileMode.Create, FileAccess.Write)))
                {
                    writer.Write(memoryStream.ToArray());
                    writer.Flush();
                    writer.Close();
                }
            }
        }

        public List<Record> LoadData() {

            List<Record> list = new List<Record>();
            
            if (File.Exists(DEFAULT_FILE)) {
                int top = (int)(new FileInfo(DEFAULT_FILE).Length - 372) / 400;
                for (int i = 0; i <= top; i++)
                {
                    list.Add(GetBlock(i));
                }

            }

            return list;
        }

        //NENÍ POTŘEBA
        private void Save(Record block)
        {

            BinaryFormatter bf = new BinaryFormatter();
            using (MemoryStream memoryStream = new MemoryStream())
            {
                if (File.Exists(DEFAULT_FILE))
                {
                    memoryStream.Position = (int)(new FileInfo(DEFAULT_FILE).Length - 372);
                    bf.Serialize(memoryStream, block);

                    using (BinaryWriter writer = new BinaryWriter(new FileStream(DEFAULT_FILE, FileMode.Open, FileAccess.Write)))
                    {
                        writer.Write(memoryStream.ToArray());
                        writer.Flush();
                        writer.Close();
                    }
                }
                else {

                    memoryStream.Position = BLOCK_SIZE;
                    bf.Serialize(memoryStream, block);

                    using (BinaryWriter writer = new BinaryWriter(new FileStream(DEFAULT_FILE, FileMode.Create, FileAccess.Write)))
                    {
                        writer.Write(memoryStream.ToArray());
                        writer.Flush();
                        writer.Close();
                    }
                }

            }
        }

        private Record GetBlock(int position)
        {
            using (BinaryReader reader = new BinaryReader(new FileStream(DEFAULT_FILE, FileMode.Open)))
            {
                reader.BaseStream.Seek(position * BLOCK_SIZE, SeekOrigin.Begin);
                byte[] data = reader.ReadBytes(BLOCK_SIZE);

                BinaryFormatter binForm = new BinaryFormatter();
                using (MemoryStream ms = new MemoryStream(data))
                {
                    Record record = (Record)binForm.Deserialize(ms);
                    return record;
                }
            }
        }

        public Stat BinarySearch(char[] key)
        {
            int left = 0;
            int right = (int)(new FileInfo(DEFAULT_FILE).Length - 372) / 400;
            int dataTransmission = 0;

            while (left <= right)
            {
                int center = (int)Math.Ceiling((left + right) / 2.0);

                Record block = GetBlock(center);
                dataTransmission++;

                if (block.CompareTo(key) == 0)
                {
                    return new Stat(block, dataTransmission);
                }
                if (block.CompareTo(key) == 1)
                {
                    right = center - 1;
                }
                else
                {
                    left = center + 1;
                }

            }
            return default;
        }

        public Stat InterpolationSearch(char[] key)
        {

            int left = 0;
            int right = (int)(new FileInfo(DEFAULT_FILE).Length - 372) / 400;
            int center = (left + right)/2;
            int dataTransmission = 0;
            int item = 0;

            //for (int i = 0; i < VOCABULARY.Length; i++)
            //{
            //    if (key[0] == VOCABULARY[i]) {
            //        item = i * 121;
            //        break;
            //    }
            //}
            //IF --------------------- => 0 && ŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽ => 10000 ---> Cylindr------- => ?
            //item = průměr

            Record blockLeft = GetBlock(left);
            Record blockRight = GetBlock(right);

            if (blockLeft.CompareTo(key) == 1 || blockRight.CompareTo(key) == -1) {
                return default;
            }
            
            while (blockRight.CompareTo(blockLeft) != 0 && blockLeft.CompareTo(key) <= 1 && blockRight.CompareTo(key) > -1) {

                center = left + ((right - left) * (item - left)) / (right - left);
                
                Record blockCenter = GetBlock(center);
                dataTransmission++;

                if (blockCenter.CompareTo(key) == -1)
                {
                    left = center + 1;
                }
                else if (blockCenter.CompareTo(key) == 1)
                {
                    right = center - 1;
                }
                else {
                    return new Stat(blockCenter, dataTransmission);
                }

                blockLeft = GetBlock(left);
                blockRight = GetBlock(right);
            }
            //while (left <= right)
            //{
            //    if (left == right)
            //    {
            //        center = left;
            //    }
            //    else
            //    {
            //        center = left + (key - blockLeft.Key) * ((right - left) / (blockRight.Key - blockLeft.Key));
            //    }

            //    DataBlock blockCenter = GetBlock(center);
            //    dataTransmission++;

            //    if (key == blockCenter.Key)
            //    {
            //        return new Stat(blockCenter, dataTransmission);
            //    }
            //    else
            //    {
            //        if (key < blockCenter.Key)
            //        {
            //            right = blockCenter.Key - 1;
            //        }
            //        else
            //        {
            //            left = blockCenter.Key + 1;
            //        }
            //    }
            //}

            return default;
        }
    }
}
