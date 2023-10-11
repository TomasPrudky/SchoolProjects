using System;

namespace MazePath
{
    public class Node : IComparable<Node>
    {
        public enum Action { 
            UP, RIGHT, DOWN, LEFT, NONE
        }

        public int ID { get; set; }
        public Point Location { get; set; }
        public Node Parent { get; set; }
        public Action NodeAction { get; set; }

        //Cena cesty z kořene k tomuto stavu (vypočítam cestu herustickou funkci asi)
        public double PathCost{ get; set; }

        //Odhad ceny cesty z počátečního vrcholu přes aktuální vrcho do cílového stavu
        //(přičtu předchozi hodnotu a udělám tady to stejný)
        public double PathEval { get; set; } 

        public Node(int iD, Point location, Node parent, Action nodeAction, double pathCost, double pathEval)
        {
            ID = iD;
            Location = location;
            Parent = parent;
            NodeAction = nodeAction;
            PathCost = pathCost;
            PathEval = pathEval;
        }

        public int CompareTo(Node other)
        {
            return (PathCost + PathEval).CompareTo((other.PathCost + other.PathEval));
        }
    }
}
