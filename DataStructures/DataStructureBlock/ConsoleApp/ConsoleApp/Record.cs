using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    [Serializable]
    public class Record : IComparable<Record>
    {
        private static int counter = 0;
        public static readonly int DEFAULT_LENGTH = 30;

        public int Key { get; set; } = counter++;
        public char[] CzechWord { get; set; }
        public char[] EnglishWord { get; set; }
        public char[] DeutschWord { get; set; }

        public Record(string czechWord, string englishWord, string deutschWord)
        {
            SetDefaultValues();
            setWordToArray(CzechWord, czechWord);
            setWordToArray(EnglishWord, englishWord);
            setWordToArray(DeutschWord, deutschWord);
        }

        private void setWordToArray(char[] array, string word)
        {
            for (int i = 0; i < word.Length; i++)
            {
                if (i >= DEFAULT_LENGTH) {
                    break;
                }
                array[i] = word.ElementAt(i);
            }
        }

        public override string ToString()
        {
            return $"{Key} | {new string(CzechWord)} | {new string(EnglishWord)} | {new string(DeutschWord)}";
        }

        private void SetDefaultValues()
        {
            CzechWord = new char[DEFAULT_LENGTH];
            EnglishWord = new char[DEFAULT_LENGTH];
            DeutschWord = new char[DEFAULT_LENGTH];
            for (int i = 0; i < DEFAULT_LENGTH; i++) {
                CzechWord[i] = '-';
                EnglishWord[i] = '-';
                DeutschWord[i] = '-';
            }
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
