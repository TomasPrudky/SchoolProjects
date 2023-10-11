using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Controller system = new Controller();
            //system.SaveToFile();
            //system.BinarySearch(35);
            //system.InterpolationSearch(1000);
            //Console.WriteLine(system.GetBlock(0));
            //foreach (var item in system.LoadData()) {
            //    Console.WriteLine(item);
            //}

            Record record = new Record("CZECHWORD", "ENGLISHWORD", "DEUTSCHWORD");
            List<Record> list = new List<Record>();
            list.Add(record);
            system.SaveToFile(list);

            //foreach (var item in system.CreateBlocks()) {
            //    Console.WriteLine(item);
            //}

            using (BinaryReader reader = new BinaryReader(new FileStream("data.bin", FileMode.Open)))
            {
                reader.BaseStream.Seek(0, SeekOrigin.Begin);
                byte[] data = reader.ReadBytes(4);

                Console.WriteLine(data);

                BinaryFormatter binForm = new BinaryFormatter();
                using (MemoryStream ms = new MemoryStream(data))
                {
                    int recordd = (int)binForm.Deserialize(ms);
                    Console.WriteLine(recordd);
                }
            }
            Console.WriteLine((int)(new FileInfo("data.dat").Length));
            Console.ReadKey();
        }
    }
}
