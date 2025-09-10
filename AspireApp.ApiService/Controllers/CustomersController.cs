using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly CustomerRepository _repository;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(CustomerRepository repository, ILogger<CustomersController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomerModel>>> Get()
    {
        List<CustomerEntity> entities = await _repository.GetCustomersAsync();
        List<CustomerModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CustomerModel>> Get(int id)
    {
        CustomerEntity? entity = await _repository.GetCustomerAsync(id);
        if (entity == null) return NotFound();
        CustomerModel model = entity.AsModel();
        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerModel>> Post([FromBody] CustomerModel model)
    {
        CustomerEntity entity = model.AsEntity();
        await _repository.CreateCustomerAsync(entity);
        CustomerModel value = entity.AsModel();
        return CreatedAtAction(nameof(Get), new { id = entity.CustomerId }, model);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] CustomerModel model)
    {
        if (id != model.CustomerId) return BadRequest();
        CustomerEntity? entity = await _repository.GetCustomerAsync(id);
        if (entity == null) return NotFound();
        entity.FirstName = model.FirstName;
        entity.MiddleInitial = model.MiddleInitial;
        entity.LastName = model.LastName;
        await _repository.UpdateCustomerAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        CustomerEntity? entity = await _repository.GetCustomerAsync(id);
        if (entity == null) return NotFound();
        await _repository.DeleteCustomerAsync(id);
        return NoContent();
    }
}
