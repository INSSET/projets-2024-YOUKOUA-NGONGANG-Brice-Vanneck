<?php
namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\RucheRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(order: ['id' => 'DESC'],
    paginationMaximumItemsPerPage: 10,
    normalizationContext: ['groups' => ['ruche:read']], denormalizationContext: ['groups' => ['ruche:write']]),
    ApiFilter(SearchFilter::class, properties: ['libelle' => 'partial']),

]
#[ORM\Entity(repositoryClass: RucheRepository::class)]
class Ruche
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['ruche:read', 'intervention:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private User $user;
    #[Groups(['ruche:read'])]
    #[ORM\Column(length: 255)]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;
    #[Groups(['ruche:read'])]
    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 16, nullable: true)]
    private ?string $longitude = null;
    #[Groups(['ruche:read'])]
    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 16, nullable: true)]
    private ?string $latitude = null;

    #[ORM\OneToMany(targetEntity: Intervention::class, mappedBy: 'ruche')]
    #[Groups(['ruche:read'])]
    private Collection $interventions;

    #[Groups(['ruche:read'])]
    #[ORM\OneToMany(targetEntity: Recolte::class, mappedBy: 'ruche')]
    private Collection $recoltes;

    public function __construct()
    {
        $this->interventions = new ArrayCollection();
        $this->recoltes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getInterventions(): Collection
    {
        return $this->interventions;
    }

    public function addIntervention(Intervention $intervention): self
    {
        if (!$this->interventions->contains($intervention)) {
            $this->interventions->add($intervention);
            $intervention->setRuche($this);
        }

        return $this;
    }

    public function removeIntervention(Intervention $intervention): self
    {
        if ($this->interventions->removeElement($intervention)) {
            $intervention->setRuche(null);
        }

        return $this;
    }

    public function getRecoltes(): Collection
    {
        return $this->recoltes;
    }

    public function addRecolte(Recolte $recolte): self
    {
        if (!$this->recoltes->contains($recolte)) {
            $this->recoltes->add($recolte);
            $recolte->setRuche($this);
        }

        return $this;
    }

    public function removeRecolte(Recolte $recolte): self
    {
        if ($this->recoltes->removeElement($recolte)) {
            $recolte->setRuche(null);
        }

        return $this;
    }
}
