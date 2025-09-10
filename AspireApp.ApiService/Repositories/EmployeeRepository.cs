using Microsoft.EntityFrameworkCore;

public class EmployeeRepository {
    private readonly DefaultDataContext _context;
    private readonly ILogger<EmployeeRepository> _logger;

    public EmployeeRepository(DefaultDataContext context, ILogger<EmployeeRepository> logger) {
        _context = context;
        _logger = logger;
    }

    public async Task<List<EmployeeEntity>> GetEmployeesAsync() {
        return await _context.Employees.AsNoTracking().ToListAsync();
    }

    public async Task<EmployeeEntity?> GetEmployeeAsync(int employeeId) {
        return await _context.Employees.FindAsync(employeeId);
    }

    public async Task CreateEmployeeAsync(EmployeeEntity employee) {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Created new employee with ID {EmployeeId}", employee.EmployeeId);
    }

    public async Task UpdateEmployeeAsync(EmployeeEntity employee) {
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Updated employee with ID {EmployeeId}", employee.EmployeeId);
    }

    public async Task DeleteEmployeeAsync(int employeeId) {
        EmployeeEntity? employee = await _context.Employees.FindAsync(employeeId);
        if (employee != null) {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Deleted employee with ID {EmployeeId}", employeeId);
        }
    }
}