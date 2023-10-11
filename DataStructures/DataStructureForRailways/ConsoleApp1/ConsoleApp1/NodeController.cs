using System.Collections.Generic;

namespace ConsoleApp1
{
    public class NodeController
    {
        public List<PairNodes> ListOfPairs { get; set; }

        public NodeController()
        {
            ListOfPairs = new();
        }

        public bool CheckIfExistInList(PairNodes node)
        {
            foreach (PairNodes item in ListOfPairs)
            {
                if (item.InEdge == node.InEdge && item.OutEdge == node.OutEdge)
                {
                    return true;
                }
            }

            return false;
        }

        public string GetSecondPair(string str)
        {
            foreach (PairNodes item in ListOfPairs)
            {
                if (item.InEdge == str)
                {
                    return item.OutEdge;
                }
                if (item.OutEdge == str)
                {
                    return item.InEdge;
                }
            }

            return "";
        }

        public PairNodes GetPair(string one) {
            foreach (var item in ListOfPairs) {
                if (one == item.InEdge || one == item.OutEdge) {
                    return item;
                }
            }
            return null;
        }
    }
}
