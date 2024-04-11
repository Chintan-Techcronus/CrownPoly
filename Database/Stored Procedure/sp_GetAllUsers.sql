-- =============================================
-- Author:		MJ Techcronus
-- Create date: 10/20/2023
-- Description:	Get all Users and user on id
-- =============================================
CREATE Procedure sp_GetAllUsers
(
@UserID int = 0
)
as
begin
if(@UserID>0)
begin
	select UserID,	FirstName,	LastName,	PIN,	IsSuper,	IsActive from tblUser 
	where UserID=@UserID
end
else
begin
	select UserID,	FirstName,	LastName,	PIN,	IsSuper,	IsActive from tblUser 
end
end

