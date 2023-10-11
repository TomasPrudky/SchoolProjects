namespace ConsoleApp1
{
    public class Edge<N, E>
    {
        public N From { get; set; }
        public N To { get; set; }
        public E Data { get; set; }

        public Edge(N from, N to, E data)
        {
            From = from;
            To = to;
            Data = data;
        }

        public override string ToString()
        {
            return $"From: {From}, to: {To}, {Data.ToString()}";
        }
    }
}
