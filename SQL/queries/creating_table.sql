CREATE TABLE IF NOT EXISTS `records_app`.`Cds` (
  `_id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Artist` VARCHAR(45) NOT NULL,
  `Format` JSON NOT NULL,
  `IsRecommend` TINYINT(1) NOT NULL DEFAULT 0,
  `Year` YEAR NOT NULL,
  `TrackList` JSON NOT NULL,cds
  `Image` LONGTEXT NOT NULL,
  `uri` LONGTEXT NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `genres` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB