﻿using BackendBridge.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BackendBridge.Controllers
{
    public class ProductController : Controller
    {
        private IProductRepository repository;
        public ProductController(IProductRepository productRepository)
        {
            this.repository = productRepository;
        }

        public ViewResult List()
        {
            return View(repository.Products);
        }
    }
}