namespace ConsoleApp1
{
    public class Train
    {
        public int TrainID { get; set; }
        public int Length { get; set; }

        private static int counter;

        public Edge<string, Rail> ActualRail { get; set; }

        public Train(int length)
        {
            TrainID = counter++;
            Length = length;
            ActualRail = null;
        }

        public Train(int length, Edge<string, Rail> actualRail) : this(length)
        {
            ActualRail = actualRail;
        }

        public override string ToString()
        {
            return $"ID: {TrainID}, length: {Length}, on rail: {ActualRail}";
        }
    }
}
