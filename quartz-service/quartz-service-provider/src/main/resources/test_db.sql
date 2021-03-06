USE [test_db]
GO
/****** Object:  Table [dbo].[order]    Script Date: 05/08/2017 17:54:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[order](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[login_name] [varchar](50) NOT NULL,
	[age] [int] NOT NULL,
	[indate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[demo]    Script Date: 05/08/2017 17:54:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[demo](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[indate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[customer]    Script Date: 05/08/2017 17:54:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[customer](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[login_name] [varchar](50) NOT NULL,
	[age] [int] NOT NULL,
	[indate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Default [DF__customer__login___0519C6AF]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT ('') FOR [login_name]
GO
/****** Object:  Default [DF__customer__age__060DEAE8]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT ((0)) FOR [age]
GO
/****** Object:  Default [DF__customer__indate__07020F21]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT (getdate()) FOR [indate]
GO
/****** Object:  Default [DF__order__login_nam__0CBAE877]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[order] ADD  DEFAULT ('') FOR [login_name]
GO
/****** Object:  Default [DF__order__age__0DAF0CB0]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[order] ADD  DEFAULT ((0)) FOR [age]
GO
/****** Object:  Default [DF__order__indate__0EA330E9]    Script Date: 05/08/2017 17:54:17 ******/
ALTER TABLE [dbo].[order] ADD  DEFAULT (getdate()) FOR [indate]
GO
