CREATE TABLE tblRole
(
[Id] [int] primary key identity(1,1),
[Name] [nvarchar](100) NOT NULL,
[IsActive] [bit] NULL DEFAULT 1,
[CreatedBy] [int] NULL,
[CreatedDate] [DATETIME] NULL,
[UpdatedBy] [int] NULL,
[UpdatedDate] [DATETIME] NULL,
[DeletedBy] [int] NULL,
[DeletedDate] [DATETIME] NULL
)