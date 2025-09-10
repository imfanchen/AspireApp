using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase {
    private readonly OrderRepository _repository;
    private readonly ILogger<OrdersController> _logger;
    public OrdersController(OrderRepository repository, ILogger<OrdersController> logger) {
        _repository = repository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderModel>>> Get() {
        List<OrderEntity> entities = await _repository.GetOrdersAsync();
        List<OrderModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OrderModel>> Get(Guid id) {
        OrderEntity? entity = await _repository.GetOrderAsync(id);
        if (entity == null) return NotFound();
        OrderModel model = entity.AsModel();
        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<OrderModel>> Post([FromBody] OrderModel model) {
        OrderEntity entity = model.AsEntity();
        await _repository.CreateOrderAsync(entity);
        OrderModel value = entity.AsModel();
        return CreatedAtAction(nameof(Get), new { id = entity.OrderId }, value);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] OrderModel model) {
        if (id != model.OrderId) return BadRequest();
        OrderEntity? entity = await _repository.GetOrderAsync(id);
        if (entity == null) return NotFound();
        entity.ProductId = model.ProductId;
        entity.CustomerId = model.CustomerId;
        entity.SalesPersonId = model.SalesPersonId;
        entity.Quantity = model.Quantity;
        try 
        {
            await _repository.UpdateOrderAsync(entity);
        } 
        catch (DbUpdateConcurrencyException) {
            return Conflict("The record you attempted to edit was modified by another user after you got the original value. The edit operation was canceled.");
        }
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) {
        OrderEntity? entity = await _repository.GetOrderAsync(id);
        if (entity == null) return NotFound();
        await _repository.DeleteOrderAsync(id);
        return NoContent();
    }

    [HttpGet("by-customer")]
    public async Task<ActionResult<IEnumerable<OrderModel>>> GetByCustomer([FromQuery]int customerId) {
        List<OrderEntity> entities = await _repository.GetOrdersByCustomerIdAsync(customerId);
        List<OrderModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("by-employee")]
    public async Task<ActionResult<IEnumerable<OrderModel>>> GetByEmployee([FromQuery]int employeeId) {
        List<OrderEntity> entities = await _repository.GetOrdersByEmployeeIdAsync(employeeId);  
        List<OrderModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("by-product")]
    public async Task<ActionResult<IEnumerable<OrderModel>>> GetByProduct([FromQuery]Guid productId) {
        List<OrderEntity> entities = await _repository.GetOrdersByProductIdAsync(productId);
        List<OrderModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }
}