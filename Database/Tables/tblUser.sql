CREATE TABLE [tblUser](
	[Id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Pin] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[IsActive] [bit] NULL DEFAULT 1,
	[CreatedBy] [int] NULL,
	[CreatedDate] [DATETIME] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [DATETIME] NULL,
	[DeletedBy] [int] NULL,
	[DeletedDate] [DATETIME] NULL
	CONSTRAINT tblUser_RoleId FOREIGN KEY ([RoleId]) REFERENCES [tblRole](Id)
)