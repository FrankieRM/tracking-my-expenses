package org.todevs.tme.web.rest;

import org.todevs.tme.TmeApp;
import org.todevs.tme.domain.Schedule;
import org.todevs.tme.domain.Transaction;
import org.todevs.tme.domain.Notification;
import org.todevs.tme.repository.ScheduleRepository;
import org.todevs.tme.service.ScheduleService;
import org.todevs.tme.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.todevs.tme.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.todevs.tme.domain.enumeration.TimeUnity;
import org.todevs.tme.domain.enumeration.ScheduleStatus;
/**
 * Integration tests for the {@link ScheduleResource} REST controller.
 */
@SpringBootTest(classes = TmeApp.class)
public class ScheduleResourceIT {

    private static final TimeUnity DEFAULT_TIME_UNITY = TimeUnity.DAYS;
    private static final TimeUnity UPDATED_TIME_UNITY = TimeUnity.WEEKS;

    private static final Integer DEFAULT_FRECUENCY_NUMBER = 1;
    private static final Integer UPDATED_FRECUENCY_NUMBER = 2;

    private static final String DEFAULT_DAY_OF_WEEK = "AAAAAAAAAA";
    private static final String UPDATED_DAY_OF_WEEK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SAME_DAY = false;
    private static final Boolean UPDATED_SAME_DAY = true;

    private static final String DEFAULT_FRECUENCY_ORDINAL_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_FRECUENCY_ORDINAL_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DUE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LIMIT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LIMIT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ScheduleStatus DEFAULT_SCHEDULE_STATUS = ScheduleStatus.SCHEDULED;
    private static final ScheduleStatus UPDATED_SCHEDULE_STATUS = ScheduleStatus.PENDING;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restScheduleMockMvc;

    private Schedule schedule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScheduleResource scheduleResource = new ScheduleResource(scheduleService);
        this.restScheduleMockMvc = MockMvcBuilders.standaloneSetup(scheduleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Schedule createEntity(EntityManager em) {
        Schedule schedule = new Schedule()
            .timeUnity(DEFAULT_TIME_UNITY)
            .frecuencyNumber(DEFAULT_FRECUENCY_NUMBER)
            .dayOfWeek(DEFAULT_DAY_OF_WEEK)
            .sameDay(DEFAULT_SAME_DAY)
            .frecuencyOrdinalNumber(DEFAULT_FRECUENCY_ORDINAL_NUMBER)
            .dueDate(DEFAULT_DUE_DATE)
            .limitDate(DEFAULT_LIMIT_DATE)
            .scheduleStatus(DEFAULT_SCHEDULE_STATUS);
        // Add required entity
        Transaction transaction;
        if (TestUtil.findAll(em, Transaction.class).isEmpty()) {
            transaction = TransactionResourceIT.createEntity(em);
            em.persist(transaction);
            em.flush();
        } else {
            transaction = TestUtil.findAll(em, Transaction.class).get(0);
        }
        schedule.setTransaction(transaction);
        // Add required entity
        Notification notification;
        if (TestUtil.findAll(em, Notification.class).isEmpty()) {
            notification = NotificationResourceIT.createEntity(em);
            em.persist(notification);
            em.flush();
        } else {
            notification = TestUtil.findAll(em, Notification.class).get(0);
        }
        schedule.setNotification(notification);
        return schedule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Schedule createUpdatedEntity(EntityManager em) {
        Schedule schedule = new Schedule()
            .timeUnity(UPDATED_TIME_UNITY)
            .frecuencyNumber(UPDATED_FRECUENCY_NUMBER)
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .sameDay(UPDATED_SAME_DAY)
            .frecuencyOrdinalNumber(UPDATED_FRECUENCY_ORDINAL_NUMBER)
            .dueDate(UPDATED_DUE_DATE)
            .limitDate(UPDATED_LIMIT_DATE)
            .scheduleStatus(UPDATED_SCHEDULE_STATUS);
        // Add required entity
        Transaction transaction;
        if (TestUtil.findAll(em, Transaction.class).isEmpty()) {
            transaction = TransactionResourceIT.createUpdatedEntity(em);
            em.persist(transaction);
            em.flush();
        } else {
            transaction = TestUtil.findAll(em, Transaction.class).get(0);
        }
        schedule.setTransaction(transaction);
        // Add required entity
        Notification notification;
        if (TestUtil.findAll(em, Notification.class).isEmpty()) {
            notification = NotificationResourceIT.createUpdatedEntity(em);
            em.persist(notification);
            em.flush();
        } else {
            notification = TestUtil.findAll(em, Notification.class).get(0);
        }
        schedule.setNotification(notification);
        return schedule;
    }

    @BeforeEach
    public void initTest() {
        schedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchedule() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();

        // Create the Schedule
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isCreated());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate + 1);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getTimeUnity()).isEqualTo(DEFAULT_TIME_UNITY);
        assertThat(testSchedule.getFrecuencyNumber()).isEqualTo(DEFAULT_FRECUENCY_NUMBER);
        assertThat(testSchedule.getDayOfWeek()).isEqualTo(DEFAULT_DAY_OF_WEEK);
        assertThat(testSchedule.isSameDay()).isEqualTo(DEFAULT_SAME_DAY);
        assertThat(testSchedule.getFrecuencyOrdinalNumber()).isEqualTo(DEFAULT_FRECUENCY_ORDINAL_NUMBER);
        assertThat(testSchedule.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testSchedule.getLimitDate()).isEqualTo(DEFAULT_LIMIT_DATE);
        assertThat(testSchedule.getScheduleStatus()).isEqualTo(DEFAULT_SCHEDULE_STATUS);
    }

    @Test
    @Transactional
    public void createScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();

        // Create the Schedule with an existing ID
        schedule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLimitDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = scheduleRepository.findAll().size();
        // set the field null
        schedule.setLimitDate(null);

        // Create the Schedule, which fails.

        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchedules() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get all the scheduleList
        restScheduleMockMvc.perform(get("/api/schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].timeUnity").value(hasItem(DEFAULT_TIME_UNITY.toString())))
            .andExpect(jsonPath("$.[*].frecuencyNumber").value(hasItem(DEFAULT_FRECUENCY_NUMBER)))
            .andExpect(jsonPath("$.[*].dayOfWeek").value(hasItem(DEFAULT_DAY_OF_WEEK)))
            .andExpect(jsonPath("$.[*].sameDay").value(hasItem(DEFAULT_SAME_DAY.booleanValue())))
            .andExpect(jsonPath("$.[*].frecuencyOrdinalNumber").value(hasItem(DEFAULT_FRECUENCY_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].limitDate").value(hasItem(DEFAULT_LIMIT_DATE.toString())))
            .andExpect(jsonPath("$.[*].scheduleStatus").value(hasItem(DEFAULT_SCHEDULE_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", schedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schedule.getId().intValue()))
            .andExpect(jsonPath("$.timeUnity").value(DEFAULT_TIME_UNITY.toString()))
            .andExpect(jsonPath("$.frecuencyNumber").value(DEFAULT_FRECUENCY_NUMBER))
            .andExpect(jsonPath("$.dayOfWeek").value(DEFAULT_DAY_OF_WEEK))
            .andExpect(jsonPath("$.sameDay").value(DEFAULT_SAME_DAY.booleanValue()))
            .andExpect(jsonPath("$.frecuencyOrdinalNumber").value(DEFAULT_FRECUENCY_ORDINAL_NUMBER))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.limitDate").value(DEFAULT_LIMIT_DATE.toString()))
            .andExpect(jsonPath("$.scheduleStatus").value(DEFAULT_SCHEDULE_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchedule() throws Exception {
        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchedule() throws Exception {
        // Initialize the database
        scheduleService.save(schedule);

        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // Update the schedule
        Schedule updatedSchedule = scheduleRepository.findById(schedule.getId()).get();
        // Disconnect from session so that the updates on updatedSchedule are not directly saved in db
        em.detach(updatedSchedule);
        updatedSchedule
            .timeUnity(UPDATED_TIME_UNITY)
            .frecuencyNumber(UPDATED_FRECUENCY_NUMBER)
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .sameDay(UPDATED_SAME_DAY)
            .frecuencyOrdinalNumber(UPDATED_FRECUENCY_ORDINAL_NUMBER)
            .dueDate(UPDATED_DUE_DATE)
            .limitDate(UPDATED_LIMIT_DATE)
            .scheduleStatus(UPDATED_SCHEDULE_STATUS);

        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchedule)))
            .andExpect(status().isOk());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getTimeUnity()).isEqualTo(UPDATED_TIME_UNITY);
        assertThat(testSchedule.getFrecuencyNumber()).isEqualTo(UPDATED_FRECUENCY_NUMBER);
        assertThat(testSchedule.getDayOfWeek()).isEqualTo(UPDATED_DAY_OF_WEEK);
        assertThat(testSchedule.isSameDay()).isEqualTo(UPDATED_SAME_DAY);
        assertThat(testSchedule.getFrecuencyOrdinalNumber()).isEqualTo(UPDATED_FRECUENCY_ORDINAL_NUMBER);
        assertThat(testSchedule.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testSchedule.getLimitDate()).isEqualTo(UPDATED_LIMIT_DATE);
        assertThat(testSchedule.getScheduleStatus()).isEqualTo(UPDATED_SCHEDULE_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSchedule() throws Exception {
        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // Create the Schedule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchedule() throws Exception {
        // Initialize the database
        scheduleService.save(schedule);

        int databaseSizeBeforeDelete = scheduleRepository.findAll().size();

        // Delete the schedule
        restScheduleMockMvc.perform(delete("/api/schedules/{id}", schedule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Schedule.class);
        Schedule schedule1 = new Schedule();
        schedule1.setId(1L);
        Schedule schedule2 = new Schedule();
        schedule2.setId(schedule1.getId());
        assertThat(schedule1).isEqualTo(schedule2);
        schedule2.setId(2L);
        assertThat(schedule1).isNotEqualTo(schedule2);
        schedule1.setId(null);
        assertThat(schedule1).isNotEqualTo(schedule2);
    }
}
