using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetDayCare.Data;
using PetDayCare.Models;

namespace PetDayCare.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PetsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pet>>> GetPets()
    {
        return await _context.Pets.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Pet>> AddPet([FromBody] Pet pet)
    {
        _context.Pets.Add(pet);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Pet>> GetPet(string id)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null) return NotFound();
        return Ok(pet);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePet(string id, [FromBody] Pet updatedPet)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null) return NotFound();

        pet.PetName = updatedPet.PetName;
        pet.Type = updatedPet.Type;
        pet.Owner = updatedPet.Owner;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePet(string id)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null) return NotFound();

        _context.Pets.Remove(pet);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
