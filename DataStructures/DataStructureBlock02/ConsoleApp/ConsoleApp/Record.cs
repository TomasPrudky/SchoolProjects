using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApp
{
    [Serializable]
    public class Record : IComparable<Record>
    {
        public static readonly int DEFAULT_LENGTH = 30;
        public char[] CzechWord { get; set; }
        public char[] EnglishWord { get; set; }
        public char[] DeutshWord { get; set; }

        public Record(string czechWord, string englishWord, string deutshWord)
        {
            setDefaultValueToWords();
            setWord(CzechWord, czechWord.ToLower());
            setWord(EnglishWord, englishWord.ToLower());
            setWord(DeutshWord, deutshWord.ToLower());
        }

        private void setDefaultValueToWords()
        {
            CzechWord = new char[DEFAULT_LENGTH];
            EnglishWord = new char[DEFAULT_LENGTH];
            DeutshWord = new char[DEFAULT_LENGTH];

            for (int i = 0; i < DEFAULT_LENGTH; i++)
            {
                CzechWord[i] = '-';
                EnglishWord[i] = '-';
                DeutshWord[i] = '-';
            }
        }

        private void setWord(char[] array, string word)
        {
            for (int i = 0; i < word.Length; i++)
            {
                if (i >= DEFAULT_LENGTH)
                {
                    break;
                }
                array[i] = word[i];
            }
        }

        public override string ToString()
        {
            return $"{new String(CzechWord)}|{new String(EnglishWord)}|{new String(DeutshWord)}";
        }

        public int CompareTo(Record other)
        {
            if (other == null) return -1;

            for (int i = 0; i < DEFAULT_LENGTH; i++)
            {
                if (CzechWord[i] == other.CzechWord[i]) continue;
                if (CzechWord[i] < other.CzechWord[i])
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }

            return 0;
        }

        public int CompareTo(char[] other)
        {
            if (other == null) return -1;

            for (int i = 0; i < DEFAULT_LENGTH; i++)
            {
                if (CzechWord[i] == other[i]) continue;
                if (CzechWord[i] < other[i])
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }

            return 0;
        }

    }
}
