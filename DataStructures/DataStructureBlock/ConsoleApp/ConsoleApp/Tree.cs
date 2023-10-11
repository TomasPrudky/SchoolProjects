using System.Collections.Generic;

namespace ConsoleApp
{
    public class Tree<T>
    {
        internal Node Root { get; set; } = new(default, null, false, 0);

        internal class Node
        {
            internal T Data { get; set; }
            internal List<Node> Lists { get; set; }
            internal Node Parent { get; set; }
            internal bool IsWord { get; set; }
            internal int Depth { get; set; }

            internal Node(T data, Node parent, bool isWord, int depth)
            {
                Data = data;
                Lists = new();
                Parent = parent;
                IsWord = isWord;
                Depth = depth;
            }

            internal bool IsLeaf()
            {
                return Lists.Count == 0;
            }

            internal Node GetChild(T data)
            {
                foreach (Node item in Lists)
                {
                    if (item.Data.Equals(data))
                    {
                        return item;
                    }
                }

                return null;
            }

            internal T RemoveChild(T data)
            {
                for (int i = 0; i < Lists.Count; i++)
                {
                    if (Lists[i].Data.Equals(data))
                    {
                        Lists.RemoveAt(i);
                        return data;
                    }
                }
                return default;
            }

            internal List<List<T>> GetWords(Node node)
            {
                Node actual = node;
                List<List<T>> words = new();

                if (actual.IsWord)
                {
                    words.Add(GetWord(actual));
                }

                GetWords(node, words);

                return words;
            }

            internal void GetWords(Node node, List<List<T>> list)
            {
                if (node.IsWord)
                {
                    list.Add(GetWord(node));
                }
                for (int i = 0; i < node.Lists.Count; i++)
                {
                    if (!node.IsLeaf())
                    {
                        GetWords(node.Lists[i], list);
                    }
                }

            }

            internal List<T> GetWord(Node actual)
            {
                List<T> word = new();
                while (!actual.Data.Equals(default))
                {
                    word.Add(actual.Data);
                    if (actual.Parent == null)
                    {
                        return word;
                    }
                    actual = actual.Parent;
                }

                return word;
            }
        }

        private Node Prefix(T[] array)
        {
            Node actualNode = Root;
            Node result = actualNode;

            foreach (T c in array)
            {
                actualNode = actualNode.GetChild(c);
                if (actualNode == null)
                {
                    break;
                }

                result = actualNode;
            }

            return result;
        }

        private bool Search(T[] array)
        {
            Node prefix = Prefix(array);
            return prefix.Depth == array.Length && prefix.GetChild(default) != null;
        }

        public void Insert(T[] array)
        {
            Node prefix = Prefix(array);
            Node actual = prefix;

            for (int i = actual.Depth; i < array.Length; i++)
            {
                Node newNode = new(array[i], actual, false, actual.Depth + 1);
                actual.Lists.Add(newNode);
                actual = newNode;
            }

            if (actual.GetChild(default) == null || ((actual.GetChild(default)).Equals(default)))
            {
                actual.Lists.Add(new(default, actual, false, actual.Depth + 1));
                actual.Lists[actual.Lists.Count - 1].IsWord = true;
            }
        }

        public List<T> Remove(T[] array)
        {
            List<T> result = new();
            if (Search(array))
            {
                Node node = Prefix(array).GetChild(default);


                while (node.IsLeaf())
                {
                    Node parent = node.Parent;
                    if (parent == null) return result;
                    result.Add(parent.RemoveChild(node.Data));
                    node = parent;
                }
            }

            return result;
        }

        public void Remove()
        {
            Root = new(default, null, false, 0);
        }

        public List<List<T>> GetWords()
        {
            return Root.GetWords(Root);
        }

        public List<List<T>> GetWords(T[] array)
        {
            Node node = Prefix(array);

            if (node.Depth < array.Length)
            {
                return null;
            }

            return Root.GetWords(node);
        }

    }
}
