using System.ComponentModel.DataAnnotations;

namespace CloudBackend.Api.Models;

public class TaskItem
{
   public int Id { get; set; }

   [Required(ErrorMessage = "Title is required")]
   [StringLength(100)]
   public string Title { get; set; } = string.Empty;

   [StringLength(300)]
   public string? Description { get; set; }

   public bool IsDone { get; set; }
}
