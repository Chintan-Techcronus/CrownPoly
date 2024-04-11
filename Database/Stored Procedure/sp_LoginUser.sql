-- =============================================
-- Author:		MJ Techcronus
-- Create date: 10/20/2023
-- Description:	Login User
-- =============================================
CREATE PROC sp_LoginUser
(
@firstName nvarchar(50),
@Pin nvarchar(50)
)
as 
begin
select UserID,	FirstName,	LastName,	PIN,	IsSuper,	IsActive from tblUser 
where IsActive=1 and FirstName=@firstName and PIN=@Pin
end