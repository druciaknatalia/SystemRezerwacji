using CloudBackend.Api.Data;
using CloudBackend.Api.DTOs;
using CloudBackend.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CloudBackend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
   private readonly AppDbContext _context;

   public TasksController(AppDbContext context)
   {
       _context = context;
   }

   // GET: api/tasks
   [HttpGet]
   public async Task<ActionResult<IEnumerable<TaskReadDto>>> GetTasks()
   {
       var tasks = await _context.Tasks
           .Select(t => new TaskReadDto
           {
               Id = t.Id,
               Title = t.Title,
               Description = t.Description,
               IsDone = t.IsDone
           })
           .ToListAsync();

       return Ok(tasks);
   }

   // GET: api/tasks/5
   [HttpGet("{id}")]
   public async Task<ActionResult<TaskReadDto>> GetTask(int id)
   {
       var task = await _context.Tasks
           .Where(t => t.Id == id)
           .Select(t => new TaskReadDto
           {
               Id = t.Id,
               Title = t.Title,
               Description = t.Description,
               IsDone = t.IsDone
           })
           .FirstOrDefaultAsync();

       if (task == null)
           return NotFound();

       return Ok(task);
   }

   // POST: api/tasks
   [HttpPost]
   public async Task<ActionResult<TodoTask>> CreateTask(TodoTask task)
   {
       _context.Tasks.Add(task);
       await _context.SaveChangesAsync();

       return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
   }

   // PUT: api/tasks/5
   [HttpPut("{id}")]
   public async Task<IActionResult> UpdateTask(int id, TodoTask updatedTask)
   {
       if (id != updatedTask.Id)
           return BadRequest();

       var existingTask = await _context.Tasks.FindAsync(id);

       if (existingTask == null)
           return NotFound();

       existingTask.Title = updatedTask.Title;
       existingTask.Description = updatedTask.Description;
       existingTask.IsDone = updatedTask.IsDone;

       await _context.SaveChangesAsync();

       return NoContent();
   }

   // DELETE: api/tasks/5
   [HttpDelete("{id}")]
   public async Task<IActionResult> DeleteTask(int id)
   {
       var task = await _context.Tasks.FindAsync(id);

       if (task == null)
           return NotFound();

       _context.Tasks.Remove(task);
       await _context.SaveChangesAsync();

       return NoContent();
   }
}

