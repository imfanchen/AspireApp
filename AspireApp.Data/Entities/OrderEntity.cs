using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Order")]
public class OrderEntity
{
    [Key]
    public Guid OrderId { get; set; }

    [ForeignKey("Product")]
    public Guid? ProductId { get; set; }

    [ForeignKey("Customer")]
    public int? CustomerId { get; set; }

    [ForeignKey("SalesPerson")]
    public int? SalesPersonId { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; }  // For optimistic concurrency control

    public ProductEntity? Product { get; set; }
    public CustomerEntity? Customer { get; set; }
    public EmployeeEntity? SalesPerson { get; set; }
}