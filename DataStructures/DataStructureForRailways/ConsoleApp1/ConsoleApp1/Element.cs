using System;

namespace ConsoleApp1
{
    public class Element : IComparable<Element>
    {
        public Edge<string, Rail> Data { get; set; }
        public int Cost { get; set; }
        public Edge<string, Rail> Parent { get; set; }

        public Element(Edge<string, Rail> data)
        {
            Data = data;
            Cost = int.MaxValue;
        }

        public Element(Edge<string, Rail> data, int cost) : this(data)
        {
            Cost = cost;
        }

        public int CompareTo(Element other)
        {
            if (Cost.CompareTo(other.Cost) != 0)
            {
                return Cost.CompareTo(other.Cost);
            }
            return 0;
        }

        public override string ToString()
        {
            return $"From: {Data.From} -> To: {Data.To}, length: {Data.Data.Length}, actual distance: {Cost}";
        }
    }
}
