using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductRepository _repository;
    private readonly ILogger<ProductsController> _logger;
    public ProductsController(ProductRepository repository, ILogger<ProductsController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductModel>>> Get()
    {
        List<ProductEntity> entities = await _repository.GetProductsAsync();
        List<ProductModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductModel>> Get(Guid id)
    {
        ProductEntity? entity = await _repository.GetProductAsync(id);
        if (entity == null) return NotFound();
        ProductModel model = entity.AsModel();
        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<ProductModel>> Post([FromBody] ProductModel model)
    {
        ProductEntity entity = model.AsEntity();
        await _repository.CreateProductAsync(entity);
        ProductModel value = entity.AsModel();
        return CreatedAtAction(nameof(Get), new { id = entity.ProductId }, value);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] ProductModel model)
    {
        if (id != model.ProductId) return BadRequest();
        ProductEntity? entity = await _repository.GetProductAsync(id);
        if (entity == null) return NotFound();
        entity.Name = model.Name;
        entity.Price = model.Price;
        await _repository.UpdateProductAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        ProductEntity? entity = await _repository.GetProductAsync(id);
        if (entity == null) return NotFound();
        await _repository.DeleteProductAsync(id);
        return NoContent();
    }
}