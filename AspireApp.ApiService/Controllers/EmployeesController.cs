using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeRepository _repository;
    private readonly ILogger<EmployeesController> _logger;

    public EmployeesController(EmployeeRepository repository, ILogger<EmployeesController> logger) 
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeModel>>> Get() 
    {
        List<EmployeeEntity> entities = await _repository.GetEmployeesAsync();
        List<EmployeeModel> models = [.. entities.Select(e => e.AsModel())];
        return Ok(models);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployeeModel>> Get(int id) 
    {
        EmployeeEntity? entity = await _repository.GetEmployeeAsync(id);
        if (entity == null) return NotFound();
        EmployeeModel model = entity.AsModel();
        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeModel>> Post([FromBody] EmployeeModel model) 
    {
        EmployeeEntity entity = model.AsEntity();
        await _repository.CreateEmployeeAsync(entity);
        EmployeeModel value = entity.AsModel();
        return CreatedAtAction(nameof(Get), new { id = entity.EmployeeId }, value);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] EmployeeModel model) 
    {
        if (id != model.EmployeeId) return BadRequest();
        EmployeeEntity? entity = await _repository.GetEmployeeAsync(id);
        if (entity == null) return NotFound();
        entity.FirstName = model.FirstName;
        entity.MiddleInitial = model.MiddleInitial;
        entity.LastName = model.LastName;
        await _repository.UpdateEmployeeAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        EmployeeEntity? entity = await _repository.GetEmployeeAsync(id);
        if (entity == null) return NotFound();
        await _repository.DeleteEmployeeAsync(id);
        return NoContent();
    }
}
