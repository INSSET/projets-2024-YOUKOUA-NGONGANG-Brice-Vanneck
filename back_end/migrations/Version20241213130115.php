<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241213130115 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intervention ADD ruche_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id)');
        $this->addSql('CREATE INDEX IDX_D11814AB87DDEC63 ON intervention (ruche_id)');
        $this->addSql('ALTER TABLE recolte ADD ruche_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE recolte ADD CONSTRAINT FK_3433713C87DDEC63 FOREIGN KEY (ruche_id) REFERENCES ruche (id)');
        $this->addSql('CREATE INDEX IDX_3433713C87DDEC63 ON recolte (ruche_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB87DDEC63');
        $this->addSql('DROP INDEX IDX_D11814AB87DDEC63 ON intervention');
        $this->addSql('ALTER TABLE intervention DROP ruche_id');
        $this->addSql('ALTER TABLE recolte DROP FOREIGN KEY FK_3433713C87DDEC63');
        $this->addSql('DROP INDEX IDX_3433713C87DDEC63 ON recolte');
        $this->addSql('ALTER TABLE recolte DROP ruche_id');
    }
}
