﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketsClientServer.Models
{
    public class Image
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }

    }

    //rewrite it
    public class AdvancedImage
    {
        public bool isActual { get; set; }
        public int Ref { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }

    }
}
