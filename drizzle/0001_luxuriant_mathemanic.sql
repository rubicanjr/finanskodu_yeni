CREATE TABLE `analysisResults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`ticker` varchar(10) NOT NULL,
	`resultImageUrl` text,
	`analysisData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analysisResults_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subscriptionTier` enum('free','pro') NOT NULL DEFAULT 'free',
	`usageCount` int NOT NULL DEFAULT 0,
	`lastResetDate` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `analysisResults` ADD CONSTRAINT `analysisResults_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;