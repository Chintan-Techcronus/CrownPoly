using CrownPoly.Core.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class JwtToken
{
    private readonly IConfiguration _configuration;

    public JwtToken(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public string GenerateJwtToken(LoginUserData userLogin)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("firstName", userLogin.FirstName),
                new Claim("lastName", userLogin.LastName),
                new Claim("roleId", userLogin.RoleId.ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, _configuration["Jwt:Audience"] ?? ""),
                new Claim(JwtRegisteredClaimNames.Iss, _configuration["Jwt:Issuer"] ?? "")
            }),
            Expires = DateTime.UtcNow.AddMinutes(int.TryParse(_configuration["Jwt:ExpireMinutes"], out var expireMinutes) ? expireMinutes : 0),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        // Include prodLine information in the JWT token as a JSON claim
        if (userLogin.ProdLines != null && userLogin.ProdLines.Any())
        {
            var prodLinesClaim = new Claim("prodLines", JsonConvert.SerializeObject(userLogin.ProdLines));
            tokenDescriptor.Subject.AddClaim(prodLinesClaim);
        }

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        return tokenString;
    }
}

