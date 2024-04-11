
CREATE TABLE tblUserProdLineMapping
(
[Id] [int] primary key identity(1,1),
[UserId] int NOT NULL,
[PLId] int NOT NULL,
[IsActive] [bit] NULL DEFAULT 1,
[CreatedBy] [int] NULL,
[CreatedDate] [DATETIME] NULL,
[UpdatedBy] [int] NULL,
[UpdatedDate] [DATETIME] NULL,
[DeletedBy] [int] NULL,
[DeletedDate] [DATETIME] NULL
CONSTRAINT tblUserProdLineMapping_UserId FOREIGN KEY ([UserId]) REFERENCES [tblUser](Id),
CONSTRAINT tblUserProdLineMapping_PLId FOREIGN KEY ([PLId]) REFERENCES [tblProdLines](Id)
)

