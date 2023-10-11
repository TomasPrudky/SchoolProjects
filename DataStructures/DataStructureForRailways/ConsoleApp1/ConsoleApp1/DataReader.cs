using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ConsoleApp1
{
    public class DataReader
    {

        public static List<string> ReadFile(string filename)
        {

            List<string> output = new();
            const Int32 BufferSize = 128;
            using (var fileStream = File.OpenRead(filename))
            using (StreamReader streamReader = new(fileStream, Encoding.UTF8, true, BufferSize))
            {
                string line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    output.Add(line);
                }
            }

            return output;
        }
    }
}
