<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241222095036 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB87DDEC63');
        $this->addSql('ALTER TABLE intervention CHANGE ruche_id ruche_id INT NOT NULL');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recolte DROP FOREIGN KEY FK_3433713C87DDEC63');
        $this->addSql('ALTER TABLE recolte CHANGE ruche_id ruche_id INT NOT NULL');
        $this->addSql('ALTER TABLE recolte ADD CONSTRAINT FK_3433713C87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB87DDEC63');
        $this->addSql('ALTER TABLE intervention CHANGE ruche_id ruche_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id)');
        $this->addSql('ALTER TABLE recolte DROP FOREIGN KEY FK_3433713C87DDEC63');
        $this->addSql('ALTER TABLE recolte CHANGE ruche_id ruche_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE recolte ADD CONSTRAINT FK_3433713C87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id)');
    }
}
