using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppAssignmnet17.Models;

namespace WebAppAssignmnet17.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext (DbContextOptions<MovieDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebAppAssignmnet17.Models.Movie> Movie { get; set; } = default!;
    }
}
