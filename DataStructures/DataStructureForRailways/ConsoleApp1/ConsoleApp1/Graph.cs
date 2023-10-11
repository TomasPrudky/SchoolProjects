using System.Collections.Generic;


namespace ConsoleApp1
{
    public class Graph<TKey, TData>
    {
        public Dictionary<TKey, List<TData>> Edges { get; set; } = new Dictionary<TKey, List<TData>>();

        public void AddNode(TKey key)
        {
            if (!Edges.ContainsKey(key))
            {
                Edges.Add(key, new List<TData>());
            }
        }

        public void AddEdge(TKey key, TData data)
        {
            if (!Edges.ContainsKey(key))
            {
                Edges.Add(key, new List<TData> { data });
            }
            else
            {
                Edges[key].Add(data);
            }
        }

        public bool RemoveNode(TKey key)
        {
            return Edges.Remove(key);
        }

        public bool RemoveEdge(TKey key, TData data)
        {
            if (Edges.ContainsKey(key))
            {
                return Edges[key].Remove(data);
            }
            return false;
        }

        public List<TData> GetData(TKey key)
        {
            if (Edges.ContainsKey(key))
            {
                return Edges[key];
            }
            return null;
        }

        public TData GetData(TData data)
        {
            foreach (var item in Edges)
            {
                foreach (TData edge in item.Value)
                {
                    if (data.Equals(edge))
                    {
                        return edge;
                    }
                }
            }

            return default(TData);
        }

        public TData GetData(TKey key, TData data)
        {
            foreach (TData edge in Edges[key])
            {
                if (data.Equals(edge))
                {
                    return edge;
                }
            }
            return default(TData);
        }

        public List<TData> GetAllEdges()
        {
            List<TData> allEdges = new List<TData>();

            foreach (var item in Edges)
            {
                allEdges.AddRange(item.Value);
            }

            return allEdges;
        }

        public List<TKey> GetNodes() {
            List<TKey> list = new();
            foreach (var item in Edges) {
                list.Add(item.Key);
            }
            return list;
        }
    }
}
