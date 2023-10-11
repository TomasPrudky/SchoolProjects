using System;
using System.IO;

namespace ConsoleApp
{
    public class DataReader
    {
        public void ReadFile(Tree<char> tree, string filename)
        {
            using (StreamReader file = new(filename))
            {
                string ln;

                while ((ln = file.ReadLine()) != null)
                {
                    char[] array = ln.ToLower().ToCharArray();
                    Array.Reverse(array);
                    tree.Insert(array);
                }

                file.Close();
            }
        }
    }
}
