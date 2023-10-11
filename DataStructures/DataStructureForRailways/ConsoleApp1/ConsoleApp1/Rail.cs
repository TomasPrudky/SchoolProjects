namespace ConsoleApp1
{
    public class Rail
    {
        public int Length { get; set; }
        public bool Standing { get; set; }
        public bool Reversing { get; set; }
        public bool IsBusy { get; set; }


        public Rail(int length, bool standing, bool reversing)
        {
            Length = length;
            Standing = standing;
            Reversing = reversing;
            IsBusy = false;
        }

        public override string ToString()
        {
            return $"length: {Length}, standing: {Standing}, reversing: {Reversing}, busy: {IsBusy}";
        }
    }
}
