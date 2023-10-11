using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApp1
{
    public class Dijkstra
    {
        private Edge<string, Rail> start;
        private Edge<string, Rail> end;
        private List<Element> Fringe { get; set; }
        private List<Element> Explored { get; set; }

        public Graph<string, Edge<string, Rail>> Graph { get; set; }
        public Train NewTrain { get; set; }

        public Dijkstra(Edge<string, Rail> start, Edge<string, Rail> end, Graph<string, Edge<string, Rail>> graph, Train train, TrainController trainController)
        {
            this.start = start;
            this.end = end;

            Graph = graph;
            NewTrain = train;
            Fringe = new();
            Explored = new();

            FillFringe();

            SetStartCost(start);
            FindShortestPath();
        }

        public List<Element> BuildPath()
        {
            List<Element> path = new();
            Element actual = null;

            actual = SetActual(end, actual);

            if (start.To == end.To)
            {
                return null;
            }

            for (int i = 0; i < Explored.Count-1; i++)
            {
                if (Explored[i].Cost == int.MaxValue)
                {
                    Explored.Remove(Explored[i]);
                }
            }

            for(int i = 0; i < Graph.GetAllEdges().Count; i++)
            {
                foreach (Element element in Explored)
                {
                    if (actual.Parent != null)
                    {
                        if (element.Data.From == actual.Parent.From && element.Data.To == actual.Parent.To)
                        {
                            path.Add(element);
                            actual = element;
                        }

                        if (actual.Parent != null)
                        {
                            if (start.From == actual.Parent.From && start.To == actual.Parent.To)
                            {
                                //path.Add(new Element(start, 0));
                                actual = SetActual(end, actual);
                                path.Add(actual);
                                path.Sort();
                                
                                NewTrain.ActualRail = path.ElementAt(path.Count-1).Data;

                                return path;
                            }
                        }

                    }
                }
            }
            return null;
        }

        private Element SetActual(Edge<string, Rail> end, Element actual)
        {
            foreach (Element item in Explored)
            {
                if (end.From == item.Data.From && end.To == item.Data.To)
                {
                    actual = item;
                }
            }

            return actual;
        }

        private void SetStartCost(Edge<string, Rail> start)
        {
            foreach (Element edge in Fringe)
            {
                if (start.From.Equals(edge.Data.From) && start.To.Equals(edge.Data.To))
                {
                    edge.Cost = 0;
                }
            }
        }

        private void FillFringe()
        {
            foreach (Edge<string, Rail> edge in Graph.GetAllEdges())
            {
                Fringe.Add(new Element(edge));
            }
        }

        public void FindShortestPath()
        {
            while (Fringe.Count != 0)
            {
                Fringe.Sort();

                FindAndEvaluateNext();

                Explored.Add(Fringe[0]);
                Fringe.RemoveAt(0);
            }
        }

        private void FindAndEvaluateNext()
        {
            List<Element> possibleStates = GetNextElements(Fringe[0]);

            foreach (Element item in possibleStates)
            {
                if (item.Cost == int.MaxValue)
                {
                    if (item.Data.Data.IsBusy)
                    {
                        continue;
                    }
                    if (item.Data.Data.Reversing)
                    {
                        if (item.Data.Data.Length < NewTrain.Length)
                        {
                            continue;
                        }
                        item.Cost = Fringe[0].Cost + NewTrain.Length;
                    }
                    else
                    {
                        item.Cost = Fringe[0].Cost + item.Data.Data.Length;
                    }
                    item.Parent = Fringe[0].Data;
                }
            }
        }

        private List<Element> GetNextElements(Element element)
        {
            List<Element> list = new();
            foreach (Element item in Fringe)
            {
                if (element.Data.To == item.Data.From)
                {
                    list.Add(item);
                }
            }
            return list;
        }
    }
}
