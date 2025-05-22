using Application.DTOs.Product;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Actor;
using Application.DTOs.Director;
using Application.DTOs.Genre;
using Application.DTOs.Movie;

namespace Application.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var products = await _repository.GetAllAsync();
            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                ImageUrl = p.ImageUrl,
                LastUpdate = p.LastUpdate
            });
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            return product == null ? null : new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                ImageUrl = product.ImageUrl,
                LastUpdate = product.LastUpdate
            };
        }

        public async Task<ProductDto> CreateAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                ImageUrl = dto.ImageUrl,
                LastUpdate = DateTime.UtcNow
            };

            var createdProduct = await _repository.AddAsync(product);
            return MapToDto(createdProduct);
        }

        public async Task<ProductDto?> UpdateAsync(int id, ProductDto dto)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return null;

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.ImageUrl = dto.ImageUrl;
            product.LastUpdate = DateTime.UtcNow;

            var updatedProduct = await _repository.UpdateAsync(product);
            return MapToDto(updatedProduct);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        private ProductDto MapToDto(Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                ImageUrl = product.ImageUrl,
                LastUpdate = product.LastUpdate
            };
        }
    }
}
