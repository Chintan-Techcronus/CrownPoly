-- =============================================
-- Author:		MJ Techcronus
-- Create date: 10/23/2023
-- Description:	Update user details
-- =============================================

CREATE PROC sp_UpdateUser
(
@UserID int,
@FirstName nvarchar(100),
@LastName nvarchar(100),
@Pin nvarchar(50),
@IsActive bit,
@IsSuper bit
)
as 
begin
	UPDATE tblUser set FirstName=@FirstName,LastName=@LastName,PIN=@Pin, IsActive=@IsActive,IsSuper=@IsSuper where UserID=@UserID
end
